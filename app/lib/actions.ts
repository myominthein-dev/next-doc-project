'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { z } from 'zod';

const formSchema = z.object({
    id : z.string(),
    customerId : z.string({
        'invalid_type_error' : "Please select a customer"
    }),
    amount : z.coerce.number().gt(0, "Please enter an amount greater than $0"),
    status : z.enum(['paid','pending'], {
        'invalid_type_error' : "Please select a status"
    }),
    date : z.string()
})

export type State  = {
    errors? : {
        customerId?: string[],
        amount?: string[],
        status?: string[]
    },
    message?: null | string
}

const sql = postgres(process.env.POSTGRES_URL!,{
    ssl : 'require',
    prepare : false
})



const CreateInvoice = formSchema.omit({id : true, date : true})

export async function createInvoice (prevState: State,formData: FormData) {
    const rawFormData = Object.fromEntries(formData.entries()); // Convert FormData to a plain object
    const validatedFields = CreateInvoice.safeParse(rawFormData);
   
    if (validatedFields.error) {

        return  {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.'
        }
    }
    const {customerId,amount,status} = validatedFields.data
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    try {
        await sql`
        INSERT INTO  invoices (customer_id,amount,status,date) VALUES  (${customerId}, ${amountInCents},${status},${date})
    `;
    } catch (e) {
        return {
            message : "Invoice creating failed!"
        }
    } 
    
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices')
    
}

const UpdateInvoice = formSchema.omit({ date : true})

export async function updateInvoice(prevState: State,formData: FormData) {
    const rawFormData = Object.fromEntries(formData.entries())

    const validatedFields = UpdateInvoice.safeParse(rawFormData);

    if (validatedFields.error) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invoice updating failed!'
        }
    }
    const {customerId,amount,status, id} = validatedFields.data

    const amountInCents = amount * 100;

    try {
        await sql`
        UPDATE invoices SET customer_id=${customerId}, amount=${amountInCents}, status=${status} WHERE id=${id}
        `;
    } catch (e) {
        return {
            message : "Updating invoice failed!"
        }
    } 

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices')

}

export async function deleteInvoice (id: string) {
   
    try {
        await sql`
        DELETE FROM invoices WHERE id=${id}
        `;
    } catch (e) {
        return {
            message : "Deleting invoice failed!"
        }
    } 
    
    revalidatePath('/dashboard/invoices');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}