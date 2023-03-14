import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

import { compare } from "bcryptjs";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    //Verificar se o email existe
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Usuário ou senha incorreto");
    }

    // verificar se a senha que ele mandou está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Usuário ou senha incorreto");
    }

    // Se deu tudo certo, vamos gerar o token para o usuário
    const token = sign(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    )
    return { 
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    };
  }
}

export { AuthUserService };
