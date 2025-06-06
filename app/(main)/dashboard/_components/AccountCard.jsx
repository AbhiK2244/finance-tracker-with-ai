"use client";

import { deleteAccount, updateDefaultAccount } from "@/actions/account";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import useFetch from "@/hooks/use-fetch";
import { ArrowDownRight, ArrowUpRight, CircleMinus, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "sonner";

const AccountCard = ({ account }) => {
  const { name, type, id, isDefault, balance } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const {
    loading: deleteAccountLoading,
    fn: deleteAccountFn,
    data: deletedAccount,
    error: deleteAcountError,
  } = useFetch(deleteAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault(); // Prevent navigation

    if (isDefault) {
      toast.warning("You need atleast 1 default account");
      return; // Don't allow toggling off the default account
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }

    if(deletedAccount?.success){
      toast.success("Deleted account successfully.")
    }
  }, [updatedAccount, deletedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
    if (deleteAcountError) {
      toast.error(error.message || "Failed to delete the account");
    }
  }, [error]);

  const handleDeleteAccount = async(event, accountId) => {
    event.preventDefault();

    if (
      !window.confirm(
        `Are you sure you want to delete the account? This action will delete all the transactions associated with this account.`
      )
    )
      return;

    deleteAccountFn(accountId);
  };

  return (
    <Card className="hover:shadow-md transition-shadow group relative">
      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium capitalize">
            {name}
          </CardTitle>
          <div className="flex gap-4 items-center">
            <Switch
              checked={isDefault}
              onClick={handleDefaultChange}
              disabled={updateDefaultLoading}
            />
           { deleteAccountLoading? <Loader2 className="h-5 w-5 animate-spin" /> : <CircleMinus onClick={(e) => handleDeleteAccount(e, id)} className="h-5 w-5 text-red-500" />}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ₹{parseFloat(balance).toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            Income
          </div>
          <div className="flex items-center">
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default AccountCard;
