import {NextResponse} from 'next/server';
import UserDAOImpl from "@/DAO/UserDAO";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({error: 'Username and password are required'}, {status: 400});
    }
    // 判断用户是否存在
    let userDAO = new UserDAOImpl();
    if (!await userDAO.isUserExists(username)) {
      return NextResponse.json({error: 'User does not exist'}, {status: 403});
    }
    // 校验密码
    if (!await userDAO.doesPasswordMatch(username, password)) {
      return NextResponse.json({error: 'User password does not match'}, {status: 403});
    }
    return NextResponse.json({
      success: 'User login succeeded'
    }, {status: 201});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: 'User registers failed'}, {status: 500});
  }
}
