import { Link } from "react-router-dom";
import { SimpleGrid, Text, VStack, Container } from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useEffect } from "react";
import ProductCard from "../Component/ProductCard";


function HomePage() {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("Products: ", products);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize="30"
          fontWeight="bold"
          textAlign="center"
          bgGradient="linear(to-r, #7928CA, #FF0080)"
          bgClip="text"
        >
          Current Products
        </Text>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={10}
          w="full"
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text fontSize="20" fontWeight="bold" textAlign="center" color="gray.500">
            No products available at the moment. Please check back later.
            <Link to="/create">
              <Text
                as="span"
                fontSize="20"
                fontWeight="bold"
                textAlign="center"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a new product
              </Text>
          </Link>
          </Text>
        )}


      </VStack>
    </Container>
  );
}

export default HomePage;
