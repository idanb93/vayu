import {
  _getAllUsers,
  _getAllGroups,
  _deleteUserFromGroup,
} from "../services/Users";
import { Request, Response } from "express";
import { DeleteUserFromGroupParam } from "./types";

export const UsersController = {
  getAllUsers,
  getAllGroups,
  deleteUserFromGroup,
};

async function getAllUsers(request: Request, response: Response) {
  try {
    const limit = Number(request.query.limit) || undefined;
    const offset = Number(request.query.offset) || undefined;

    if (!limit || !offset) {
      return response.status(400).send({
        message:
          "Please add query params: 'limit' and 'offset' must be valid numbers.",
      });
    }

    const res = await _getAllUsers(limit, offset);
    response.status(200).send({
      message: "Users fetched successful!",
      data: res,
    });
  } catch (err) {
    console.log(err);
    response.status(404).send({
      message: `error in getAllUsers : ${err}`,
    });
  }
}

async function getAllGroups(request: Request, response: Response) {
  try {
    const limit = Number(request.query.limit) || undefined;
    const offset = Number(request.query.offset) || undefined;

    if (!limit || !offset) {
      return response.status(400).send({
        message:
          "Please add query params: 'limit' and 'offset' must be valid numbers.",
      });
    }
    const res = await _getAllGroups(limit, offset);
    response.status(200).send({
      message: "Users groups fetched successful!",
      data: res,
    });
  } catch (err) {
    console.log(err);
    response.status(404).send({
      message: `error in getAllGroups : ${err}`,
    });
  }
}

async function deleteUserFromGroup(
  request: Request<DeleteUserFromGroupParam>,
  response: Response,
) {
  try {
    const userId = Number(request.query.userId) || undefined;
    const groupId = Number(request.query.groupId) || undefined;

    if (!userId || !groupId) {
      return response.status(400).send({
        message:
          "Please add query params: 'userId' and 'groupId' must be valid numbers.",
      });
    }

    const res = await _deleteUserFromGroup(userId, groupId);
    if (!res) {
      throw new Error(`User to remove not found!`);
    }
    response.status(200).send({
      message: "User has been removed from the group!",
    });
  } catch (err) {
    console.log(err);
    response.status(404).send({
      message: `error in deleteUserFromGroup : ${err}`,
    });
  }
}
