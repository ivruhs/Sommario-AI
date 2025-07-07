import { getDbConnection } from "@/lib/db";

export async function getSummaries(userId: string) {
  const sql = await getDbConnection();
  const summaries = await sql`
    SELECT * 
    FROM pdf_summaries 
    WHERE user_id = ${userId} AND status != 'deleted'
    ORDER BY created_at DESC;
  `;
  return summaries;
}

export async function getSummaryById(id: string) {
  try {
    const sql = await getDbConnection();
    const [summary] = await sql`
      SELECT 
        id,
        user_id,
        title,
        original_file_url,
        summary_text,
        status,
        created_at,
        updated_at,
        file_name,
        LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 as word_count
      FROM pdf_summaries 
      WHERE id = ${id} AND status != 'deleted';
    `;

    return summary;
  } catch (err) {
    console.error("Error fetching summary by id", err);
    return null;
  }
}

export async function getMonthlyUploadCount(userId: string): Promise<number> {
  const sql = await getDbConnection();
  try {
    const [result] = await sql`
      SELECT COUNT(*) as count 
      FROM pdf_summaries 
      WHERE user_id = ${userId}
        AND created_at >= date_trunc('month', CURRENT_DATE);
    `;
    return parseInt(result?.count ?? "0", 10);
  } catch (error) {
    console.error("Error fetching monthly upload count", error);
    return 0;
  }
}
