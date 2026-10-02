const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

dotenv.config();

const users = [
  {
    name: 'Admin ElectroTech',
    email: 'admin@electrotech.com',
    password: 'Password123!',
    role: 'admin'
  },
  {
    name: 'Ahmad Alayan',
    email: 'ahmad@example.com',
    password: 'Password123!',
    role: 'customer'
  },
  {
    name: 'Sarah Connor',
    email: 'sarah@example.com',
    password: 'Password123!',
    role: 'customer'
  }
];

const products = [
  {
    name: 'Apex ProBook Ultra 16',
    sku: 'LAP-APEX-16',
    brand: 'Apex',
    category: 'Laptops',
    description: '16-inch Retina 120Hz display, 32GB Unified RAM, 1TB NVMe Gen4 SSD, 14-Core CPU for heavy engineering workloads.',
    price: 1899.99,
    countInStock: 15,
    rating: 4.9,
    numReviews: 24,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Quantum ThinkStation X1',
    sku: 'LAP-QNTM-X1',
    brand: 'Quantum',
    category: 'Laptops',
    description: 'Carbon fiber lightweight ultrabook with OLED touch display, Intel Core Ultra 9, 64GB LPDDR5X RAM, and dual Thunderbolt 4 ports.',
    price: 2199.0,
    countInStock: 8,
    rating: 4.8,
    numReviews: 18,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Vortex Horizon Phone 15 Pro',
    sku: 'PHN-VRX-15P',
    brand: 'Vortex',
    category: 'Smartphones',
    description: 'Titanium chassis, 6.7-inch Super AMOLED 144Hz panel, triple 50MP sensor array with periscope optical zoom, 5000mAh battery.',
    price: 1199.99,
    countInStock: 25,
    rating: 4.7,
    numReviews: 42,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Nova Lite Smartphone 5G',
    sku: 'PHN-NOV-5G',
    brand: 'Nova',
    category: 'Smartphones',
    description: 'Sleek budget champion with Snapdragon 7 Gen 3, 108MP camera, 67W fast charging, and dual stereo speakers.',
    price: 399.0,
    countInStock: 30,
    rating: 4.5,
    numReviews: 15,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'AcousticPure Wireless ANC Headphones',
    sku: 'AUD-ACPU-NC',
    brand: 'AcousticPure',
    category: 'Audio',
    description: 'Active hybrid noise cancellation up to 45dB, 40mm beryllium drivers, 55-hour playback time, LDAC hi-res wireless streaming.',
    price: 299.99,
    countInStock: 40,
    rating: 4.8,
    numReviews: 38,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'EchoPulse Studio Wireless Earbuds',
    sku: 'AUD-ECHP-BUD',
    brand: 'EchoPulse',
    category: 'Audio',
    description: 'Spatial audio with dynamic head tracking, IPX7 water resistance, wireless Qi charging case, and adaptive microphone isolation.',
    price: 159.5,
    countInStock: 50,
    rating: 4.6,
    numReviews: 29,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Chronos Smartwatch Titan Edition',
    sku: 'WRB-CHRN-TTN',
    brand: 'Chronos',
    category: 'Wearables',
    description: 'Sapphire glass dial, aerospace titanium frame, continuous ECG monitoring, dual-band GPS, and 14-day battery life.',
    price: 449.99,
    countInStock: 18,
    rating: 4.7,
    numReviews: 31,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'FitTrack Pulse Band 6',
    sku: 'WRB-FTRK-PB6',
    brand: 'FitTrack',
    category: 'Wearables',
    description: 'Lightweight fitness tracker with AMOLED color touch screen, SpO2 sensor, sleep quality stage score, and 5ATM water rating.',
    price: 79.99,
    countInStock: 60,
    rating: 4.4,
    numReviews: 19,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'OmniHub 12-in-1 Thunderbolt 4 Dock',
    sku: 'ACC-OMNI-12',
    brand: 'OmniHub',
    category: 'Accessories',
    description: 'Triple 4K 60Hz display output, 100W Power Delivery pass-through, UHS-II SD slot, 2.5Gbps Ethernet, and aluminum unibody build.',
    price: 189.0,
    countInStock: 22,
    rating: 4.9,
    numReviews: 14,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'PrecisionCraft Mechanical Keyboard',
    sku: 'ACC-PRC-KB',
    brand: 'PrecisionCraft',
    category: 'Accessories',
    description: 'Hot-swappable tactile switches, gasket-mounted dampening foam, PBT double-shot keycaps, RGB backlighting, Bluetooth and USB-C.',
    price: 139.99,
    countInStock: 35,
    rating: 4.8,
    numReviews: 53,
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'
  }
];

const importData = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI || 'mongodb://localhost:27017/electrotech';
    await mongoose.connect(mongoUri);

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = [];
    for (const user of users) {
      const u = new User(user);
      await u.save();
      createdUsers.push(u);
    }

    await Product.insertMany(products);

    console.log('Sample data imported successfully');
    process.exit();
  } catch (error) {
    console.error(`Import failed: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI || 'mongodb://localhost:27017/electrotech';
    await mongoose.connect(mongoUri);

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed successfully');
    process.exit();
  } catch (error) {
    console.error(`Destroy failed: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
