"use server";

import { getDbConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummaryAction(summaryId: string) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      throw new Error("User not found");
    }

    const sql = await getDbConnection();

    // Soft delete: update status to 'deleted'
    const result = await sql`
      UPDATE pdf_summaries
      SET status = 'deleted'
      WHERE id = ${summaryId} AND user_id = ${userId}
      RETURNING id;
    `;

    if (result.length > 0) {
      revalidatePath("/dashboard");
      return { success: true, message: "Summary deleted successfully" };
    }

    return {
      success: false,
      message: "Summary not found or you do not have permission to delete it",
    };
  } catch (error) {
    console.error("Error deleting summary:", error);
    return {
      success: false,
      message: "An error occurred while deleting the summary",
    };
  }
}
