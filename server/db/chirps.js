import { Query } from "./index";

const all = async () => Query('SELECT * FROM chirps');
const one = async (id) => Query('SELECT * FROM chirps WHERE id = ?', [id]);
const add = async (userid, content, location) => Query('insert into chirps(userid, content, location) values(?, ?, ?);', [userid, content, location]);
const remove = async (id) => Query('delete FROM chirps WHERE id = ?', [id]);

export default {
  all,
  one,
  add, 
  remove
}