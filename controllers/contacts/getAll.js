const {Contact} = require("../../models");

const getAll = async (req, res) => {
  const {_id} = req.user;
  const { page = 1, limit = 5, favorite } = req.query;
  const skip = (page - 1) * limit;

  if (favorite === "true") {
    
    const contacts = await Contact.find({ owner: _id, favorite }, "", {
      skip: skip,
      limit: Number(limit),
    }).populate("owner", " _id name email subscription");

    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  };  

  const contacts = await Contact.find({owner: _id}, "", {skip, limit: Number(limit)}).populate("owner", "_id");
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts
    },
  });
};

module.exports = getAll;