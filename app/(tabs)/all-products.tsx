import axios from "axios";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import uuid from "react-native-uuid";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: { rate: number };
}

export default function AllProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredProducts(filtered);
    }
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <View style={styles.productContent}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <View style={styles.priceRating}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <Text style={styles.rating}>★ {item.rating?.rate ?? "N/A"}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Products</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchText}
        onChangeText={handleSearch}
        placeholderTextColor="#999"
      />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0a7ea4" />
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={() => uuid.v4().toString()}
          scrollEnabled={true}
          numColumns={1}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No products found</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: width * 0.05,
    paddingTop: width * 0.03,
    paddingBottom: width * 0.03,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: Math.max(20, Math.min(28, width * 0.07)),
    fontWeight: "800",
    color: "#11181C",
  },
  searchInput: {
    marginHorizontal: width * 0.04,
    marginVertical: width * 0.03,
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.03,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#ddd",
    fontSize: Math.max(12, Math.min(16, width * 0.04)),
    backgroundColor: "#f9f9f9",
    color: "#11181C",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productItem: {
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.03,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  productContent: {
    gap: 6,
  },
  productTitle: {
    fontSize: Math.max(12, Math.min(15, width * 0.035)),
    fontWeight: "600",
    color: "#11181C",
    lineHeight: Math.max(16, Math.min(20, width * 0.04)),
  },
  productCategory: {
    fontSize: Math.max(10, Math.min(13, width * 0.032)),
    color: "#687076",
    textTransform: "capitalize",
    fontWeight: "500",
  },
  priceRating: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: Math.max(13, Math.min(17, width * 0.042)),
    fontWeight: "700",
    color: "#0a7ea4",
  },
  rating: {
    fontSize: Math.max(10, Math.min(13, width * 0.032)),
    color: "#ff9500",
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: width * 0.1,
  },
  emptyText: {
    fontSize: Math.max(14, Math.min(17, width * 0.042)),
    color: "#687076",
  },
});
