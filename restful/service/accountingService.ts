import { Knex } from "knex";
import { log } from "console";


export class AccountingService {
    constructor(private knex: Knex) { }

    addTransaction = async (name: string, type: string, amount: number, description?: string) => {
        try {
            let addTransaction =
                await this.knex("transaction").insert([
                    {
                        category: name,
                        type: type,
                        amount: amount,
                        user_id: "1",
                        description: description
                    }
                ])
                    .returning("*")
            console.log(addTransaction);

        } catch (error) {
            console.error('Error occurred while adding transaction: ', error);
        }
    }

    getTransaction = async (name: string, type: string, amount: number, description?: string) => {

    }

}

