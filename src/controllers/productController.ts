import { Request, Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/authMiddleware";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, imageUrl, stock, size, categoryId } =
      req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        stock,
        size,
        categoryId,
      },
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};

// export const getProducts = async (req: Request, res: Response) => {
//   try {
//     const products = await prisma.product.findMany({
//       include: {
//         category: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     res.json({
//       success: true,
//       products,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch products",
//     });
//   }
// };
export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;

    const products = await prisma.product.findMany({
      where: {
        AND: [
          category
            ? {
                category: {
                  name: {
                    equals: String(category),
                    mode: "insensitive",
                  },
                },
              }
            : {},

          search
            ? {
                OR: [
                  {
                    name: {
                      contains: String(search),
                      mode: "insensitive",
                    },
                  },

                  {
                    description: {
                      contains: String(search),
                      mode: "insensitive",
                    },
                  },
                ],
              }
            : {},
        ],
      },

      include: {
        category: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};
export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { name, description, price, imageUrl, stock, size, categoryId } =
      req.body;

    const updatedProduct = await prisma.product.update({
      where: {
        id: Number(id),
      },

      data: {
        name,
        description,
        price,
        imageUrl,
        stock,
        size,
        categoryId,
      },
    });

    res.json({
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};
