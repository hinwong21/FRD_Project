"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorsService = void 0;
class EditorsService {
    constructor(knex) {
        this.knex = knex;
        this.addMemo = async (id, content, userId) => {
            await this.knex
                .insert({
                id: id,
                content: JSON.stringify(content),
                user_id: userId,
            })
                .into("memo");
        };
        this.getMemo = async (userId) => {
            const memos = await this.knex("memo").select("*").where("user_id", userId);
            return memos;
        };
        this.updateMemo = async (id, content) => {
            await this.knex("memo")
                .update({
                content: JSON.stringify(content),
                updated_at: new Date(),
            })
                .where("id", id);
        };
        this.newDiary = async (id, content, weather, title, mood, userId) => {
            await this.knex
                .insert({
                id: id,
                content: JSON.stringify(content),
                weather: JSON.stringify(weather),
                title: title,
                mood: mood,
                user_id: userId,
            })
                .into("dairy");
        };
        this.getDiary = async (userId) => {
            const diaries = await this.knex("dairy")
                .select("*")
                .where("user_id", userId);
            return diaries;
        };
        // updateDiary(req.body.id, req.body.content, req.body.updated_at,req.body.title, req.body.mood, req.session.userId as string)
        this.updateDiary = async (id, content, updated_at, title, mood) => {
            await this.knex("dairy")
                .update({
                content: JSON.stringify(content),
                updated_at: new Date(),
                title: title,
                mood: mood,
            })
                .where("id", id);
        };
        this.knex = knex;
    }
}
exports.EditorsService = EditorsService;
//# sourceMappingURL=editorsService.js.map