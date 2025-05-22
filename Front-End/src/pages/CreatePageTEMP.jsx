import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Toast,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";
import { useToast } from "@chakra-ui/react";

function CreatePageTEMP() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: '',
    imageUrl: "",
  });

  const { createProduct } = useProductStore(); // ✅ corect, cu P mare
  const toast = useToast(); 
  const handleAddProduct = async () => {  
    const { success, message } = await createProduct(newProduct); // ✅ la fel aici
    if(success) {
      toast({
        title: "Product created.",
        description: "Product has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }else{
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
    setNewProduct({ name: "", price: 0, imageUrl: "" }); // Reset the form
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" mb="8">
          Create a new product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />

            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: Number(e.target.value) })
              }
            />

            <Input
              placeholder="Image URL"
              name="imageUrl"
              value={newProduct.imageUrl}
              onChange={(e) =>
                setNewProduct({ ...newProduct, imageUrl: e.target.value })
              }
            />

            <Button
              colorScheme="blue"
              onClick={handleAddProduct}
              w="full"
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreatePageTEMP;
