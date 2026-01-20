import Express, { Router } from "express";
import { UsersController } from "../controllers/UsersController";

const UsersRouter: Router = Express.Router();
const { getAllUsers, getAllGroups, deleteUserFromGroup } = UsersController;

UsersRouter.get("/get_all_users", getAllUsers);
UsersRouter.get("/get_all_groups", getAllGroups);
UsersRouter.delete("/delete_user_from_group", deleteUserFromGroup);

export default UsersRouter;
