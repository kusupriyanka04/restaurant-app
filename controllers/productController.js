const supabase = require('../config/db');

exports.getProducts = async (req, res) => {
  const { category, restaurant, search, type } = req.query;

  let query = supabase.from('products').select('*');

  if (category) {
    query = query.ilike('category', `%${category}%`);
  }

  if (restaurant) {
    query = query.ilike('restaurant', `%${restaurant}%`);
  }

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }

  if (type === 'trending') {
    query = query.gt('offer', 0);
  }

  const { data, error } = await query;

  if (error) return res.status(500).json(error);
  res.json(data);
};

exports.addProduct = async (req, res) => {
const { name, description, price, category,
      restaurant, image, rating, offer } = req.body;


const { error } = await supabase.from('products').insert([
{ name, description, price, category,
      restaurant, image, rating: rating || 4.0, offer: offer || 0 }
]);


if (error) return res.status(400).json(error);
res.json({ message: 'Product added successfully' });
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: "Product deleted successfully" });
};
