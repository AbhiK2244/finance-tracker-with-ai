import { getUserAccounts } from '@/actions/dashboard'
import React from 'react'
import AddTransactionForm from '../_components/AddTransactionForm';
import { defaultCategories } from '@/data/categories';

const AddTransactionPage = async() => {

    const accounts = await getUserAccounts()

  return (
    <div className='px-5 max-w-3xl mx-auto'>
        <h1 className='text-5xl gradient-title mb-8'>Add Transaction</h1>

        <AddTransactionForm accounts={accounts} categories={defaultCategories} />
    </div>
  )
}

export default AddTransactionPage
