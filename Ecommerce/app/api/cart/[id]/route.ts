import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { quantity } = await request.json()

    if (quantity < 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid quantity' },
        { status: 400 }
      )
    }

    if (quantity === 0) {
      // Remove item from cart
      await prisma.cartItem.delete({
        where: {
          id: params.id,
          userId: session.user.id,
        },
      })

      return NextResponse.json({
        success: true,
        data: null,
      })
    }

    // Update quantity
    const cartItem = await prisma.cartItem.update({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      data: { quantity },
      include: {
        product: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: cartItem,
    })
  } catch (error) {
    console.error('Error updating cart item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update cart item' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await prisma.cartItem.delete({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    return NextResponse.json({
      success: true,
      data: null,
    })
  } catch (error) {
    console.error('Error deleting cart item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete cart item' },
      { status: 500 }
    )
  }
}
