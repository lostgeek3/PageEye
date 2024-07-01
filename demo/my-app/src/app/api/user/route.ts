import {NextRequest, NextResponse} from 'next/server';
import UserDAOImpl from "@/DAO/UserDAO";
import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {NextApiRequest, NextApiResponse} from "next";
import {number} from "prop-types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({error: 'Id is requirued'}, {status: 400});
    }
    let userDAO = new UserDAOImpl();
    let user = await userDAO.findUserById(parseInt(id));
    if (user === null) {
      return NextResponse.json({error: 'User does not exist'}, {status: 403});
    }
    return NextResponse.json({
      success: 'Get user succeeded',
      ...user
    }, {status: 201});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: 'Get user failed'}, {status: 500});
  }
}
