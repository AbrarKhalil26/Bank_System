// ---------------------------------------------
// Create model
// ---------------------------------------------
export const create = async ({ model, data } = {}) => {
  return await model.create(data);
};

// ---------------------------------------------
// Find Model
// ---------------------------------------------
export const find = async ({ model, filter = {}, options = {} } = {}) => {
  const doc = model.find(filter);
  if (options.populate) doc.populate(options.populate);
  if (options.select)   doc.select(options.select);  
  if (options.sort)     doc.sort(options.sort);     
  if (options.skip)     doc.skip(options.skip);
  if (options.limit)    doc.limit(options.limit);
  if (options.lean)     doc.lean();                 
  return await doc.exec();
};

export const findOne = async ({ model, filter = {}, options = {} } = {}) => {
  const doc = model.findOne(filter);
  if (options.populate) doc.populate(options.populate);
  if (options.skip) doc.skip(options.skip);
  if (options.limit) doc.limit(options.limit);
  return await doc.exec();
};

export const findById = async ({ model, id, populate = [], select = "", lean = false }) => {
  const doc = model.findById(id).populate(populate).select(select);
  if (lean) doc.lean();
  return await doc.exec();
};

// ---------------------------------------------
// Update Model
// ---------------------------------------------
export const updateOne = async ({ model, filter = {},update={}, options = {} } = {}) => {
  const doc = model.updateOne(filter, update, {runValidators: true, ...options});
  return await doc.exec();
};

export const findOneAndUpdate = async ({ model, filter = {},update={}, options = {} } = {}) => {
  const doc = model.findOneAndUpdate(filter, update, {new: true, runValidators: true, ...options});
  return await doc.exec();
};

// ---------------------------------------------
// Delete Model
// ---------------------------------------------
export const deleteOne = async ({ model, filter = {} } = {}) => {
  return await model.deleteOne(filter, options);
};

export const deleteMany = async ({ model, filter = {} } = {}) => {
  return await model.deleteMany(filter, options);
};