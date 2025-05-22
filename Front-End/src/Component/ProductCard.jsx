import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  IconButton,
  Image,
  Text,
  Heading,
  useColorModeValue,
  useToast,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Starea locală pentru editare
  const [editProduct, setEditProduct] = useState({
    name: product.name,
    price: product.price,
    imagine: product.imagine,
  });

  const handleDeleteProduct = async (id) => {
    const { message, success } = await deleteProduct(id);
    if (success) {
      toast({
        title: "Product deleted",
        description: message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const { updateProduct } = useProductStore(); // adaugă aici

  const handleUpdateProduct = async () => {
    const { message, success } = await updateProduct(product._id, editProduct);
    if (success) {
      toast({
        title: "Product updated",
        description: message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose();
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };


  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.imagine}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2} color={textColor}>
          {product.name}
        </Heading>
        <Text fontSize="lg" color="gray.500">
          ${product.price}
        </Text>

        <HStack spacing={2} mt={4}>
          <IconButton icon={<EditIcon />} colorScheme="blue" onClick={onOpen} />
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={() => handleDeleteProduct(product._id)}
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={editProduct.name}
                onChange={handleChange}
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={editProduct.price}
                onChange={handleChange}
              />
              <Input
                placeholder="Image URL"
                name="imagine"
                value={editProduct.imagine}
                onChange={handleChange}
              />
              <ModalFooter>
                <Button
                  color={'blue.300'}
                  mr={3}
                  onClick={handleUpdateProduct}
                >
                  Update
                </Button>
                <Button colorScheme="red" onClick={onClose}>
                  Cancel 
                </Button>
              </ModalFooter>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
