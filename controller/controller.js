import Joi from "joi";

import { data } from "../Data/data.js";

const inputValidationHandler = (postData) => {
  const schema = Joi.object({
    id: Joi.number().max(30).required(),
    name: Joi.string().max(10).required(),
    professions: Joi.string().max(30).required(),
  }).with("id", "name");

  return schema.validate(postData);
};

/***
 * @route   GET /api/data/:name/:id
 * @desc    Test route
 * @access  Private
 *  ***/
export const testRoute = (req, res) => {
  const { name, id } = req.params;

  try {
    const resData = data[id];
    if (id !== data[id] && name !== data[id].name) {
      res.send("Invalid request parameter provided!");
    }

    res.send(resData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};

/***
 * @route   GET /api/data
 * @desc    Get all data
 * @access  Private
 *  ***/
export const getAllData = (req, res) => {
  try {
    res.send(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};

/***
 * @route   GET /api/data/:id
 * @desc    Get data by Id
 * @access  Private
 *  ***/
export const getDataById = (req, res) => {
  const { id } = req.params;

  try {
    const neededData = data.find((d) => {
      return d.id === parseInt(id);
    });

    if (!neededData) {
      return res.status(404).send("There is no data with the given id.");
    }

    res.send(neededData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};

/***
 * @route   POST /api/data
 * @desc    Create new data
 * @access  Private
 *  ***/
export const postData = (req, res) => {
  const postData = req.body;

  try {
    const { error, value } = inputValidationHandler(postData);

    if (error) {
      console.log(`Error msg: ${error}`);
      return res.status(400).send(error.message);
    }

    data.push(value);
    console.log("Post Successful: ", value);
    return res.status(200).send(value);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};

/***
 * @route   PATCH /api/data
 * @desc    Update specific data
 * @access  Private
 *  ***/
export const updateData = (req, res) => {
  const { id, name, professions } = req.body;

  /* new data */
  const updatedData = {};
  if (id) updatedData.id = id;
  if (name) updatedData.name = name;
  if (professions) updatedData.professions = professions;

  try {
    let neededData = data.find((d) => {
      return d.id === parseInt(req.params.id);
    });

    if (!neededData) {
      return res.status(404).send("There is no data with the given id");
    }

    const { error } = inputValidationHandler(req.body);

    if (error) {
      console.log(`Error msg (PATCH): ${error.message}`);
      return res.status(400).send(error.message);
    }

    const itemNeeded = data.indexOf(neededData);
    if (itemNeeded !== -1) {
      data[itemNeeded] = updatedData;
    }

    res.status(200).send(updatedData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};

/***
 * @route   DELETE /api/data
 * @desc    Delete specific data
 * @access  Private
 *  ***/
export const deletePost = (req, res) => {
  const { id } = req.params;

  try {
    const neededData = data.find((d) => {
      return (d.id = parseInt(id));
    });

    if (!neededData) {
      return res.status(404).send("There is no data with the given id");
    }

    const idxOfData = data.indexOf(neededData);
    const item = data.splice(idxOfData, 1);
    res.status(200).send(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
};
