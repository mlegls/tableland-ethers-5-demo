import { Database } from "@tableland/sdk"
import { Wallet, getDefaultProvider } from "ethers-6";


const prefix = "test_table"

interface RunsSchema {
  id: number;
  content: string;
}

const wallet = new Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
const provider = getDefaultProvider("http://127.0.0.1:8545");
const signer = wallet.connect(provider)
export const db = new Database<RunsSchema>({ signer });

const main = async () => {
  const { meta: create } = await db
    .prepare(
      `CREATE TABLE ${prefix} (
      id INTEGER PRIMARY KEY,
      content TEXT
    );`
    )
    .run();

  await create.txn?.wait();
  const tableName = create.txn?.names[0] ?? "";
  console.log("Table created: ", tableName);
};

main();

