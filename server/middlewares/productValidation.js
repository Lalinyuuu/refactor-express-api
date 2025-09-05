function isNonEmptyString(v) {
    return typeof v === 'string' && v.trim().length > 0;
  }
  function isPositiveNumber(v) {
    return typeof v === 'number' && Number.isFinite(v) && v > 0;
  }
  
  export function validateProduct(req, res, next) {
    const method = req.method.toUpperCase();
    const body = req.body ?? {};
    const fields = ['name', 'price', 'image', 'description', 'category'];
    const errors = [];
  
    if (method === 'POST') {
      for (const f of fields) if (!(f in body)) errors.push(`"${f}" is required`);
    } else if (method === 'PUT') {
      const provided = fields.filter((f) => f in body);
      if (provided.length === 0) {
        return res.status(400).json({ message: 'At least one updatable field is required' });
      }
    }
  
    if ('name' in body && !isNonEmptyString(body.name)) errors.push('"name" must be a non-empty string');
    if ('price' in body && !isPositiveNumber(body.price)) errors.push('"price" must be a number greater than 0');
    if ('image' in body && !isNonEmptyString(body.image)) errors.push('"image" must be a non-empty string');
    if ('description' in body) {
      if (!isNonEmptyString(body.description)) errors.push('"description" must be a non-empty string');
      else if (body.description.trim().length < 10) errors.push('"description" must be at least 10 characters');
    }
    if ('category' in body && !isNonEmptyString(body.category)) errors.push('"category" must be a non-empty string');
  
    if (errors.length) return res.status(400).json({ message: errors.join('; ') });
    next();
  }