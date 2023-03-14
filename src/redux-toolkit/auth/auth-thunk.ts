import { createAsyncThunk } from "@reduxjs/toolkit";
import { Account } from "../../app-types/account.type";
import { getCurrentAccount, updateAccount } from "../../services/auth.service";

export const getCurrentAccountThunk = createAsyncThunk(
  "auth/getCurrentAccountThunk",
  async (userId: string) => {
    try {
      const account = await getCurrentAccount(userId);
      return account;
    } catch (error: any) {
      throw error;
    }
  }
);

export type argsUpdateAccountType = {
  userId?: string;
  account?: Account;
};

export const updateAccountThunk = createAsyncThunk(
  "auth/updateAccountThunk",
  async (args: argsUpdateAccountType) => {
    try {
      const { userId, account } = args;
      await updateAccount(userId!, account!);
    } catch (error: any) {
      throw error;
    }
  }
);
