import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MapPin, Calendar, Package, Heart, Settings } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+977-9841234567',
    address: '123 Sports Street, Kathmandu, Nepal',
    dateOfBirth: '1990-05-15',
    preferences: {
      newsletter: true,
      smsUpdates: false,
      orderUpdates: true
    }
  });

  const orderHistory = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 17000,
      items: [
        { name: 'Manchester United Home Jersey', size: 'L', quantity: 1, price: 8500 },
        { name: 'Liverpool Away Jersey', size: 'M', quantity: 1, price: 8500 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'In Transit',
      total: 9000,
      items: [
        { name: 'Manchester City Home Jersey', size: 'XL', quantity: 1, price: 9000 }
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'Processing',
      total: 8000,
      items: [
        { name: 'Arsenal Home Jersey', size: 'L', quantity: 1, price: 8000 }
      ]
    }
  ];

  const wishlistItems = [
    {
      id: '1',
      name: 'Barcelona Home Jersey 2024',
      price: 9500,
      originalPrice: 11000,
      image: '',
      category: 'Football',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Real Madrid Away Jersey 2024',
      price: 9200,
      image: '',
      category: 'Football',
      rating: 4.7
    }
  ];

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false);
    console.log('Profile saved:', profileData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
            className={isEditing ? "bg-gradient-primary text-white" : ""}
          >
            <Settings className="h-4 w-4 mr-2" />
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="firstName"
                        className="pl-10"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="phone"
                      className="pl-10"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="address"
                      className="pl-10"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="dateOfBirth"
                      type="date"
                      className="pl-10"
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  View your past orders and track current deliveries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="border border-border rounded-lg p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Package className="h-5 w-5 text-primary" />
                          <div>
                            <h3 className="font-semibold">{order.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              Ordered on {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <p className="text-lg font-bold mt-1">
                            Rs. {order.total.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm">
                              {item.name} (Size: {item.size}) x {item.quantity}
                            </span>
                            <span className="text-sm font-medium">
                              Rs. {item.price.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {order.status === 'Delivered' && (
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>My Wishlist</CardTitle>
                <CardDescription>
                  Items you've saved for later
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="border border-border rounded-lg p-4 space-y-4">
                      <div className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center">
                        <div className="text-muted-foreground text-sm">Product Image</div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold">
                            Rs. {item.price.toLocaleString()}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              Rs. {item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Link to={`/product/${item.id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            View Product
                          </Button>
                        </Link>
                        <Button className="flex-1 bg-gradient-primary text-white">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="newsletter">Newsletter</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about new products and offers
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        id="newsletter"
                        checked={profileData.preferences.newsletter}
                        onChange={(e) => setProfileData({
                          ...profileData,
                          preferences: {
                            ...profileData.preferences,
                            newsletter: e.target.checked
                          }
                        })}
                        className="rounded border-border"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="smsUpdates">SMS Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Get order updates via SMS
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        id="smsUpdates"
                        checked={profileData.preferences.smsUpdates}
                        onChange={(e) => setProfileData({
                          ...profileData,
                          preferences: {
                            ...profileData.preferences,
                            smsUpdates: e.target.checked
                          }
                        })}
                        className="rounded border-border"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="orderUpdates">Order Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications about your orders
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        id="orderUpdates"
                        checked={profileData.preferences.orderUpdates}
                        onChange={(e) => setProfileData({
                          ...profileData,
                          preferences: {
                            ...profileData.preferences,
                            orderUpdates: e.target.checked
                          }
                        })}
                        className="rounded border-border"
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Account Actions</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Download My Data
                    </Button>
                    <Button variant="destructive" className="w-full justify-start">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;