import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { BookmarksProvider } from "@/contexts/BookmarksContext";
import { CartProvider } from "@/contexts/CartContext";
import { OrdersProvider } from "@/contexts/OrdersContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import LoginSignup from "./pages/LoginSignup";
import Cart from "./pages/Cart";
import OrderForm from "./pages/OrderForm";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";

const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const NewArrivals = lazy(() => import("./pages/NewArrivals"));

const queryClient = new QueryClient();

const App = () => {
  const pathname = window.location.pathname;
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <OrdersProvider>
          <CartProvider>
            <BookmarksProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                {pathname !== "/login" && <Header />}
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/bookmarks" element={<Bookmarks />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/login" element={<LoginSignup />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/order" element={<OrderForm />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route
                    path="/new-arrivals"
                    element={
                      <Suspense fallback={null}>
                        <NewArrivals />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/category/:category"
                    element={
                      <Suspense fallback={null}>
                        <CategoryPage />
                      </Suspense>
                    }
                  />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                {pathname !== "/login" && <Footer />}
              </BrowserRouter>
            </BookmarksProvider>
          </CartProvider>
        </OrdersProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
