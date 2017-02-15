import DataStore from 'nedb';
const db = new DataStore();


export const get = async(name) => {
  await db[name].loadDatabase();
}

export const post = async(name) => {

}

export const put = async(name) => {

}

export const remove = async(name) => {

}

export const patch = async(name) => {

}
