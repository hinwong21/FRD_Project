import { Knex } from "knex";
import { v4 as uuidv4 } from "uuid";

export class PeriodService {
  constructor(private knex: Knex) {}

  // getUpcomingAt = async (userId: string) => {
  //   try {
  //     const upcomingDate = await this.knex("period")
  //       .select("upcoming_at")
  //       .where("user_id", userId);

  //     console.log("upcomingDate::", upcomingDate);

  //     return {
  //       success: true,
  //       upcomingDate,
  //     };
  //   } catch (error) {
  //     throw new Error((error as Error).message);
  //   }
  // };
  getUpcomingAt = async (userId: string) => {
    try {
      const upcomingDate = await this.knex("period")
        .select("*")
        .where("user_id", userId)
        .orderBy("updated_at", "asc");

      console.log("All Period data::", upcomingDate);

      return {
        success: true,
        upcomingDate,
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  //This is the first time to input data
  inputAllPeriodData = async (
    id: string,
    userId: string,
    start_at: string,
    end_at: string,
    upcoming_at: string,
    days: string,
    ovu_start_at: string,
    ovu_end_at: string
  ) => {
    try {
      console.log(id);
      console.log(upcoming_at);
      console.log(userId);

      await this.knex("period").insert({
        //TODO 要在frontend 先gen個id先
        id: id,
        user_id: userId,
        start_at,
        end_at,
        upcoming_at,
        days: days,
        ovu_start_at,
        ovu_end_at,
      });

      return {
        success: true,
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  //This is for update the period data
  updatePeriodData = async (
    id: string,
    start_at?: string,
    end_at?: string,
    upcoming_at?: string,
    days?: string,
    ovu_start_at?: string,
    ovu_end_at?: string
  ) => {
    try {
      // console.log("id", id);
      // console.log("start_at", start_at);
      // console.log("end_at", end_at);
      // console.log("upcoming_at", upcoming_at);
      // console.log("days", days);
      // console.log("ovu_start_at", ovu_start_at);
      // console.log("ovu_end_at", ovu_end_at);

      if (start_at) {
        await this.knex("period").where({ id }).update({ start_at });
      }
      if (end_at) {
        await this.knex("period").where({ id }).update({ end_at });
      }
      if (upcoming_at) {
        await this.knex("period").where({ id }).update({ upcoming_at });
      }
      if (days) {
        await this.knex("period").where({ id }).update({ days });
      }
      if (ovu_start_at) {
        await this.knex("period").where({ id }).update({ ovu_start_at });
      }
      if (ovu_end_at) {
        await this.knex("period").where({ id }).update({ ovu_end_at });
      }
      return {
        success: true,
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  //For the first time to insert period status
  inputPeriodStatus = async (
    statusId: string, //TODO frontend gen
    periodId: string, //TODO frontend gen
    type: string,
    content: string
  ) => {
    try {
      console.log("Input STS run");
      console.log("sts id:", statusId);
      console.log("per id:", periodId);
      console.log("type:", type);
      console.log("content:", content);

      // TODO DB refresh insert 到但係大眼仔 係false,而且要hard code，大眼仔入唔得
      //Insert into period_status table
      await this.knex("period_status").insert({
        id: statusId,
        type,
        content,
      });
      console.log("Input STS run 1");

      // TODO Insert 唔到
      //Insert into period_period_status table
      await this.knex("period_period_status").insert({
        id: uuidv4(),
        period_id: periodId,
        period_status_id: statusId,
      });
      console.log("Input STS run 2");

      return {
        success: true,
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  //For update the period status
  //TODO 大眼仔error，但controller hard code先得，但唔識update update_at
  updatePeriodStatus = async (
    statusId: string,
    type: string,
    content: string
  ) => {
    try {
      console.log("updatePeriodStatus");
      console.log("statusId", statusId);
      console.log("type", type);
      console.log("content", content);

      await this.knex("period_status")
        .where({ id: statusId })
        .update({ type, content });
      return {
        success: true,
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  //For get the period status data
  getPeriodStatus = async (periodId: string) => {
    try {
      const periodStatus = await this.knex("period_period_status")
        .select("type", "content")
        // .select("*")
        .innerJoin("period", "period_period_status.period_id", "period.id")
        .innerJoin(
          "period_status",
          "period_period_status.period_status_id",
          "period_status.id"
        )
        .where("period_period_status.period_id", periodId)
        .orderBy("updated_at", "asc");

      console.log("periodStatus:", periodStatus);

      return {
        success: true,
        periodStatus,
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
}
