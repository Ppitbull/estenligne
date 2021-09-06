import { EntityID } from "../../entities/entityid";
import { DbBranch } from "../enum/db-branch.enum";

export function getBranchOfUsers():string
{
    return `${DbBranch.general_users}`
}

export function getBranchOfUser(userID:EntityID):string
{
    return `${getBranchOfUsers()}/${userID.toString()}`;
}

export function getBranchOfUserData():string
{
    return `${DbBranch.general_users_data}`
}

export function getBanchOfCandidature(candidatureID:EntityID):string
{
    return `${getBranchOfCandidatures()}/${candidatureID.toString()}/${DbBranch.candidatures_data}`
}

export function getBranchOfCandidatures():string
{
    return `${getBranchOfUserData()}/${DbBranch.candidatures}`
}

export function getBranchCommentaireCandidatures(candidatureID:EntityID):string
{
    return `${getBranchOfCandidatures()}/${candidatureID.toString()}/${DbBranch.candidature_comment}`
}

