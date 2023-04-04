import { Knex } from "knex";
import { log } from "console";


export class AccountingService {
    constructor(private knex: Knex) { }

    addTransaction = async (id: number, name: string, type: string, amount: string, description?: string) => {
        try {
            let addTransaction =
                await this.knex("transaction").insert([
                    {
                        category: name,
                        type: type,
                        amount: amount,
                        user_id: "1",  //插個"1" ok?
                        description: description
                    }]).returning("*")
            console.log(addTransaction);
            return addTransaction
        } catch (error) {
            console.error('Error occurred while adding transaction: ', error);
        }
    }

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

    getTransaction = async (userId: number) => {
        try {
            let getTransaction = await this.knex("transaction")
                .select("*")
                .where("user_id", userId)
            console.log(getTransaction)
            return getTransaction
        } catch (error) {
            console.error('Error occurred while getting transaction', error);
        }
    }

}

