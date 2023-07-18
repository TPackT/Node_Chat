import { db } from "../database.js"
import crypto from "crypto"

export const createUser = async (username, password) => {
    const salt = crypto.randomBytes(16).toString("hex")
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex")
    const token = crypto.randomBytes(16).toString("hex")
    const [user] = await db("users").insert({ username, salt, hash, token }).returning('*')
    
    return user
}


export const getUserByPassword = async (username, password) => {
    const user = await db("users").where({ username }).first()
    if (!user) return null

    const salt = user.salt
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex")
    if (hash !== user.hash) return null

    return user
}

export const getUserByToken = async (token) => {
    const user = await db("users").where({ token }).first()
    return user
}

export const getUserById = async (userId) => {
    const user = await db("users").where("id", userId)
    return user
}

