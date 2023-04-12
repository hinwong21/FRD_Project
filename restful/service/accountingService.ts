import { Knex } from "knex";

export class AccountingService {
  constructor(private knex: Knex) { }

  addTransaction = async (
    // id: number,
    name: string,
    type: string,
    amount: string,
    description: string,
    userId: string,

  ) => {
    try {
      let addTransaction = await this.knex("transaction")
        .insert([
          {
            // id: id,
            category: name,
            type: type,
            amount: amount,
            description: description,
            user_id: userId,
          },
        ])
        .returning("*");
      console.log('accountingService.ts', addTransaction);
      return addTransaction;
    } catch (error) {
      throw new Error(`Error occurred while adding transaction in accountingService: ${error.message}`);
    }
  };

  // getTransaction = async (userId: number, name: string, type: string, amount: number, description?: string) => {
  //     try {
  //         const transactionResule =
  //             await this.knex("transaction")
  //                 .select("*")
  //                 .where("user_id", userId)
  //         return transactionResule
  //     } catch (error) {
  //         console.error('Error occurred while getting', error);
  //     }
  // }

  getTransaction = async (userId: string) => {
    try {
      let getTransaction = await this.knex("transaction")
        .select("*")
        // .where({ user_id: userId });
        .where("user_id", userId)
      console.log(getTransaction);

      return getTransaction;
    } catch (error) {
      throw new Error(`Error occurred while getting transaction in accountingService: ${error.message}`);
    }
  };

  getMonthlyTransaction = async (userId: string) => {
    try {
      let getMonthlyTransaction = await this.knex("transaction")
        .select("*")
        .where("user_id", userId)
        .whereRaw(`date_trunc('month', created_at) = date_trunc('month', current_date)`)
        .whereRaw(`created_at::date <= current_date::date`);
      console.log('accountingService : ', getMonthlyTransaction);

      return getMonthlyTransaction;

    } catch (error) {
      throw new Error(`Error occurred while getting Monthly transaction in accountingService: ${error.message}`);
    }
  }
}
