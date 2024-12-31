import { getUserAccounts } from "@/actions/dashboard";
import React from "react";
import AddTransactionForm from "../_components/AddTransactionForm";
import { defaultCategories } from "@/data/categories";
import { getTransaction } from "@/actions/transaction";

const AddTransactionPage = async ({ searchParams }) => {
  const accounts = await getUserAccounts();

  const searchData = await searchParams;
  const editId = searchData?.edit;

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  // console.log(!!editId)

  return (
    <div className="px-5 max-w-3xl mx-auto">
      <h1 className="text-5xl gradient-title mb-8"> {editId ? "Edit" : "Add"} Transaction</h1>

      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}  // just to make it boolean value
        initialData={initialData}
      />
    </div>
  );
};

export default AddTransactionPage;
