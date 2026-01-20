import { GroupStatus } from "../core/enums/GroupStatus";
import { sqlConnector } from "../core/sql/sqlConnector";
import { User } from "../core/types/User";

export async function _getAllUsers(
  limit?: number,
  offset?: number,
): Promise<Array<User>> {
  try {
    const query: string = `SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`;
    return await sqlConnector.query(query);
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
}

export async function _getAllGroups(
  limit?: number,
  offset?: number,
): Promise<Array<User>> {
  try {
    const query: string = `SELECT * FROM groups LIMIT ${limit} OFFSET ${offset}`;
    return await sqlConnector.query(query);
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
}

async function _changeGroupStatus(
  groupId: number,
  newStatus: GroupStatus,
): Promise<void> {
  try {
    const updateQuery = `UPDATE groups SET status = $2 WHERE id = $1`;
    await sqlConnector.query(updateQuery, [groupId, newStatus]);
    console.log(`Changed group: ${groupId} to status: ${newStatus}`);
  } catch (err) {
    console.error("Error updating group status:", err);
  }
}

async function _checkIfGroupEmpty(groupId: number): Promise<boolean> {
  try {
    const query =
      "SELECT EXISTS(SELECT 1 FROM user_groups WHERE group_id = $1)";
    const result = await sqlConnector.query(query, [groupId]);
    return !result[0].exists;
  } catch (err) {
    console.error("Error checking if group is empty:", err);
    throw err;
  }
}

export async function _deleteUserFromGroup(userId: number, groupId: number) {
  try {
    const query =
      "DELETE FROM user_groups WHERE user_id = $1 AND group_id = $2 RETURNING *";
    const result = await sqlConnector.query(query, [userId, groupId]);
    const emptyGroup: boolean = await _checkIfGroupEmpty(groupId);
    if (emptyGroup) {
      console.log(`Changing group ${groupId} status to ${GroupStatus.EMPTY}`);
      _changeGroupStatus(groupId, GroupStatus.EMPTY);
    }
    return result[0];
  } catch (err) {
    console.error("Error deleting user from group:", err);
    throw err;
  }
}
