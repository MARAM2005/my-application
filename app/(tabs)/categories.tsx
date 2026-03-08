import axios from "axios";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    SectionList,
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

interface CategorySection {
  title: string;
  data: Product[];
}

export default function CategoriesScreen() {
  const [sections, setSections] = useState<CategorySection[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setAllProducts(res.data);
        groupByCategory(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const groupByCategory = (products: Product[]) => {
    const grouped: { [key: string]: Product[] } = {};

    products.forEach((product) => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });

    const sectionsArray = Object.keys(grouped)
      .sort()
      .map((category) => ({
        title: category.charAt(0).toUpperCase() + category.slice(1),
        data: grouped[category],
      }));

    setSections(sectionsArray);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);

    if (text === "") {
      groupByCategory(allProducts);
    } else {
      const filtered = allProducts.filter((product) =>
        product.title.toLowerCase().includes(text.toLowerCase()),
      );
      groupByCategory(filtered);
    }
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <Text style={styles.productTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <View style={styles.productDetails}>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.rating}>★ {item.rating?.rate ?? "N/A"}</Text>
      </View>
    </View>
  );

  const renderSectionHeader = ({ section }: { section: CategorySection }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <Text style={styles.itemCount}>{section.data.length} items</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by product name..."
        value={searchText}
        onChangeText={handleSearch}
        placeholderTextColor="#999"
      />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0a7ea4" />
        </View>
      ) : (
        <SectionList
          sections={sections}
          renderItem={renderProduct}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={() => uuid.v4().toString()}
          scrollEnabled={true}
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
  sectionHeader: {
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.025,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#0a7ea4",
  },
  sectionTitle: {
    fontSize: Math.max(13, Math.min(16, width * 0.04)),
    fontWeight: "700",
    color: "#0a7ea4",
  },
  itemCount: {
    fontSize: Math.max(10, Math.min(12, width * 0.03)),
    color: "#687076",
    fontWeight: "600",
    backgroundColor: "#e8f4f8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  productItem: {
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.03,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    gap: 4,
  },
  productTitle: {
    fontSize: Math.max(12, Math.min(14, width * 0.035)),
    fontWeight: "600",
    color: "#11181C",
    lineHeight: Math.max(16, Math.min(20, width * 0.04)),
  },
  productDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: Math.max(12, Math.min(15, width * 0.035)),
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
