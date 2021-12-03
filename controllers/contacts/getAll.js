const {Contact} = require('../../models')

const getAll = async (req, res)=> {
    const {_id} = req.user;

    //* usage without mongoose-paginate-v2 *//
    // const {page = 1, limit = 10} = req.query;
    // const skip = (page - 1) * limit;
    //   const result = await Contact.find({owner: _id}, "", {skip, limit:Number(limit)}).populate("owner", "_id subscription email");
    
    //* usage without paginate *//
    //  const result = await Contact.find({owner: _id}).populate("owner", "_id subscription email");
    
    //* mongoose-paginate-v2 *//
    const {
        page = 1,
        limit = 5,
        favorite = null
      } = req.query; 

    const ownerSearch = {owner: _id};

   if (favorite !== null) {
    ownerSearch.favorite = favorite;
    }
    const result = await Contact.paginate(ownerSearch, {page, limit, populate: {path:"owner", select:"_id email subscription"}});
   
    res.json({
          status: "success",  
          code: 200,
          data: {
             result: result.docs
          }
      })
  }

  module.exports = getAll