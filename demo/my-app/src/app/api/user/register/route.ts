import {NextResponse} from 'next/server';
import UserDAOImpl from "@/DAO/UserDAO";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;
    // 检查请求体
    if (!username || !password || !email) {
      return NextResponse.json({error: 'Username, password and email are required'}, {status: 400});
    }
    // 判断用户是否已存在
    let userDAO = new UserDAOImpl();
    if (await userDAO.isUserExists(username)) {
      return NextResponse.json({error: 'User already exists'}, {status: 403});
    }
    const user = await userDAO.createUser({
      username: username,
      nickname: '',
      avatar: '',
      tel: '',
      email: 'email',
      userSetting: {
        create: {}
      },
      userAuth: {
        create: {
          password: password
        }
      }
    });
    return NextResponse.json({
      success: 'User registers succeeded'
    }, {status: 201});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: 'User registers failed'}, {status: 500});
  }
}
