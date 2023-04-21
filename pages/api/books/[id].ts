import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db";
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "DELETE") {
    await db.read();
    const { id } = request.query;
    if (db.data) {
      db.data.books = db.data?.books.filter((book) => book.id !== id);
    }
    db.write();
    response.statusCode = 204;
    response.end();
  }
}
