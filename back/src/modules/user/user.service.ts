import type {
  CreateExperienceDto,
  CreateUserSkillsDto,
  CreateUserDto,
} from './dto/create-user.dto';
import { CustomError } from '@/utils/custom_error';
import { hash } from 'bcrypt';
import type { LoginUserDto } from '../auth/dto/login.dto';
import { HttpStatus } from '@/utils/enums/http-status';
import type {
  UpdateUserDto,
  UpdateUserEducationDto,
  UpdateUserExperienceDto,
  UpdateUserProfileInfoDto,
} from './dto/update-user-info.dto';
import { ErrorMessage } from '@/utils/enums/errors';
import { db } from '@/db/drizzle/connect';
import type { UserInferSelect } from '@/db/drizzle/schema/user/schema';
import {
  userEducation,
  userExperience,
  userFiles,
  userLocation,
  userProfleInfo,
  users,
  userSkills,
} from '@/db/drizzle/schema/user/schema';
import { and, eq, ilike, or } from 'drizzle-orm';
import type { AddFileDto } from './dto/add-file.dto';
import { EditFileDto } from './dto/edit-file.dto';
import { skillPool } from '@/db/drizzle/schema/testing/schema';

export const getUserByUID = async (uid: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.uid, uid));
    return user[0];
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const getUserByOAuthId = async (id: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.oAuthId, id));
    return user[0];
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const getUserByTag = async (tag: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.tag, tag));
    return user[0];
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const getUserByLoginData = async (loginData: LoginUserDto) => {
  try {
    if (loginData.mail) {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.mail, loginData.mail));
      if (user.length === 0) {
        throw new CustomError(
          HttpStatus.BAD_REQUEST,
          ErrorMessage.ERROR_VALIDATION
        );
      }
      return user[0];
    } else if (loginData.phone) {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.phone, loginData.phone));
      if (user.length === 0) {
        throw new CustomError(
          HttpStatus.BAD_REQUEST,
          ErrorMessage.ERROR_VALIDATION
        );
      }
      return user[0];
    }
    throw new CustomError(
      HttpStatus.BAD_REQUEST,
      ErrorMessage.ERROR_VALIDATION
    );
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const createUser = async (createUserDto: CreateUserDto) => {
  try {
    const tryUser = await db
      .select()
      .from(users)
      .where(eq(users.mail, createUserDto.mail));
    if (tryUser.length > 0) {
      throw new CustomError(HttpStatus.CONFLICT);
    }
    if (createUserDto.password) {
      const hashPassword = await hash(createUserDto.password, 10);
      createUserDto.password = hashPassword;
    }

    const user = await db.insert(users).values(createUserDto).returning();

    if (createUserDto.password) {
      await db.update(users).set({ password: createUserDto.password });
    }

    await db.insert(userProfleInfo).values({ userUid: user[0].uid }).execute();

    return user[0];
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const getUserProfile = async (tag: string) => {
  try {
    const user = await db
      .select({
        uid: users.uid,
        fullName: users.fullName,
        mail: users.mail,
        tag: users.tag,
        phone: users.phone,
        role: users.role,
        birthDate: users.birthDate,
        image: users.image,
        backgroundImage: users.backgroundImage,
        via: users.via,
      })
      .from(users)
      .where(eq(users.tag, tag));
    if (user.length === 0) {
      throw new CustomError(HttpStatus.BAD_REQUEST, 'Пользователь не найден');
    }
    const profileInfo = await db
      .select({
        uid: userProfleInfo.uid,
        isSearchingJob: userProfleInfo.isSearchingJob,
        status: userProfleInfo.status,
        about: userProfleInfo.about,
      })
      .from(userProfleInfo)
      .where(eq(userProfleInfo.userUid, user[0].uid));

    const experience = await db
      .select({
        uid: userExperience.uid,
        name: userExperience.name,
        position: userExperience.position,
        startDate: userExperience.startDate,
        endDate: userExperience.endDate,
        present: userExperience.present,
      })
      .from(userExperience)
      .where(eq(userExperience.profileInfoUid, profileInfo[0].uid));

    const education = await db
      .select({
        uid: userEducation.uid,
        university: userEducation.university,
        direction: userEducation.direction,
        startDate: userEducation.startDate,
        endDate: userEducation.endDate,
      })
      .from(userEducation)
      .where(eq(userEducation.profileInfoUid, profileInfo[0].uid));

    const skills = await db
      .select({
        uid: userSkills.uid,
        name: userSkills.level,
      })
      .from(userSkills)
      .where(eq(userSkills.profileInfoUid, profileInfo[0].uid));

    const location = await db
      .select({
        uid: userLocation.uid,
        country: userLocation.country,
        region: userLocation.region,
        city: userLocation.city,
      })
      .from(userLocation)
      .where(eq(userLocation.profileInfoUid, profileInfo[0].uid));

    const files = await db
      .select({
        uid: userFiles.uid,
        file: userFiles.file,
        category: userFiles.category,
      })
      .from(userFiles)
      .where(eq(userFiles.profileInfoUid, profileInfo[0].uid));

    const response = {
      ...user[0],
      profileInfo: {
        ...profileInfo[0],
        userExperience: experience,
        userEducation: education[0] || null,
        userFiles: files,
        userLocation: location[0] || null,
        userSkills: skills,
      },
    };

    return response;
  } catch (error) {
    console.log(error);
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const getUserProfileInfo = async (userUid: string) => {
  try {
    const user = await db
      .select({
        uid: users.uid,
        fullName: users.fullName,
        mail: users.mail,
        tag: users.tag,
        phone: users.phone,
        role: users.role,
        birthDate: users.birthDate,
        image: users.image,
        backgroundImage: users.backgroundImage,
        via: users.via,
      })
      .from(users)
      .where(eq(users.uid, userUid));
    if (user.length === 0) {
      throw new CustomError(HttpStatus.BAD_REQUEST, 'Пользователь не найден');
    }
    const profileInfo = await db
      .select({
        uid: userProfleInfo.uid,
        isSearchingJob: userProfleInfo.isSearchingJob,
        status: userProfleInfo.status,
        about: userProfleInfo.about,
      })
      .from(userProfleInfo)
      .where(eq(userProfleInfo.userUid, user[0].uid));
    const response = {
      ...user[0],
      profileInfo: profileInfo[0],
    };
    return response;
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const getUserSkills = async (userUid: string) => {
  try {
    const user = await db
      .select({
        uid: users.uid,
      })
      .from(users)
      .where(eq(users.uid, userUid));
    if (user.length === 0) {
      throw new CustomError(HttpStatus.BAD_REQUEST, 'Пользователь не найден');
    }
    const profileInfo = await db
      .select({
        uid: userProfleInfo.uid,
      })
      .from(userProfleInfo)
      .where(eq(userProfleInfo.userUid, user[0].uid));
    const skills = await db
      .select()
      .from(userSkills)
      .where(eq(userSkills.profileInfoUid, profileInfo[0].uid))
      .leftJoin(skillPool, eq(skillPool.uid, userSkills.skillUid));

    const response = {
      userSkills: skills.map((skill) => ({
        uid: skill.user_skills.uid,
        name: skill.skill_pool.name,
        level: skill.user_skills.level,
      })),
    };
    return response;
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const getUserEducation = async (userUid: string) => {
  try {
    const user = await db
      .select({
        uid: users.uid,
      })
      .from(users)
      .where(eq(users.uid, userUid));
    if (user.length === 0) {
      throw new CustomError(HttpStatus.BAD_REQUEST, 'Пользователь не найден');
    }
    const profileInfo = await db
      .select({
        uid: userProfleInfo.uid,
      })
      .from(userProfleInfo)
      .where(eq(userProfleInfo.userUid, user[0].uid));
    const education = await db
      .select()
      .from(userEducation)
      .where(eq(userEducation.profileInfoUid, profileInfo[0].uid));
    const files = await db
      .select()
      .from(userFiles)
      .where(eq(userFiles.profileInfoUid, profileInfo[0].uid));

    const response = {
      userEducation: education[0]
        ? {
            uid: education[0].uid,
            university: education[0].university,
            direction: education[0].direction,
            format: education[0].format,
            startDate: education[0].startDate,
            endDate: education[0].endDate,
          }
        : null,
      files: files.map((file) => ({
        uid: file.uid,
        file: file.file,
        category: file.category,
      })),
    };
    return response;
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const getUserExperience = async (userUid: string) => {
  try {
    const user = await db
      .select({
        uid: users.uid,
      })
      .from(users)
      .where(eq(users.uid, userUid));
    if (user.length === 0) {
      throw new CustomError(HttpStatus.BAD_REQUEST, 'Пользователь не найден');
    }
    const profileInfo = await db
      .select({
        uid: userProfleInfo.uid,
      })
      .from(userProfleInfo)
      .where(eq(userProfleInfo.userUid, user[0].uid));

    const experience = await db
      .select({
        uid: userExperience.uid,
        name: userExperience.name,
        position: userExperience.position,
        startDate: userExperience.startDate,
        endDate: userExperience.endDate,
        present: userExperience.present,
      })
      .from(userExperience)
      .where(eq(userExperience.profileInfoUid, profileInfo[0].uid));
    const response = {
      userExperience: experience,
    };
    return response;
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const getUserSecurity = async (userUid: string) => {
  try {
    const user = await db
      .select({
        uid: users.uid,
        mail: users.mail,
        phone: users.phone,
      })
      .from(users)
      .where(eq(users.uid, userUid));
    if (user.length === 0) {
      throw new CustomError(HttpStatus.BAD_REQUEST, 'Пользователь не найден');
    }
    const response = {
      mail: user[0].mail,
      phone: user[0].phone,
    };
    return response;
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const createExperience = async (
  userUid: string,
  data: CreateExperienceDto
) => {
  try {
    const profileInfo = await db
      .select()
      .from(userProfleInfo)
      .where(eq(userProfleInfo.userUid, userUid));
    await db
      .insert(userExperience)
      .values({ ...data, profileInfoUid: profileInfo[0].uid })
      .execute();
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const createSkills = async (
  userUid: string,
  data: CreateUserSkillsDto
) => {
  try {
    const profileInfo = await db
      .select()
      .from(userProfleInfo)
      .where(eq(userProfleInfo.userUid, userUid));
    await db
      .insert(userSkills)
      .values({ ...data, profileInfoUid: profileInfo[0].uid })
      .execute();
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const updateUserProfile = async (
  userUid: string,
  data: UpdateUserProfileInfoDto
) => {
  try {
    const user = await db.select().from(users).where(eq(users.uid, userUid))[0];
    await db
      .update(userProfleInfo)
      .set(data)
      .where(eq(userProfleInfo.userUid, user.uid));
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const updateUser = async (userUid: string, data: UpdateUserDto) => {
  try {
    const user = await db.select().from(users).where(eq(users.uid, userUid));
    const { profileInfo, profileLoc, ...rest } = data;
    if (
      rest.tag &&
      (await db.select().from(users).where(eq(users.tag, rest.tag))).length > 0
    ) {
      throw new CustomError(
        HttpStatus.BAD_REQUEST,
        'Такой тег уже используется'
      );
    }
    if (rest) {
      await db.update(users).set(data).where(eq(users.uid, userUid));
    }
    if (profileInfo) {
      await db
        .update(userProfleInfo)
        .set(profileInfo)
        .where(eq(userProfleInfo.userUid, user[0].uid));
    }
    if (profileLoc) {
      const profileInfo = await db
        .select()
        .from(userProfleInfo)
        .where(eq(userProfleInfo.userUid, user[0].uid));
      const tryLoc = await db
        .select()
        .from(userLocation)
        .where(eq(userLocation.profileInfoUid, profileInfo[0].uid));

      if (tryLoc.length === 0) {
        await db
          .insert(userLocation)
          .values({
            ...profileLoc,
            profileInfoUid: profileInfo[0].uid,
          })
          .execute();
        return;
      }
      await db
        .update(userLocation)
        .set(profileLoc)
        .where(eq(userLocation.profileInfoUid, profileInfo[0].uid));
    }
    if (data.tag) {
      return { tag: data.tag };
    } else {
      return {
        message: 'ok',
      };
    }
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const updateUserExp = async (data: UpdateUserExperienceDto) => {
  try {
    const { uid, ...rest } = data;
    await db
      .update(userExperience)
      .set(rest)
      .where(eq(userExperience.uid, uid));
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const updateUserEducation = async (
  userUid: string,
  data: UpdateUserEducationDto
) => {
  try {
    const user = await db
      .select({
        uid: users.uid,
      })
      .from(users)
      .where(eq(users.uid, userUid));
    if (user.length === 0) {
      throw new CustomError(HttpStatus.BAD_REQUEST, 'Пользователь не найден');
    }
    const profileInfo = await db
      .select({
        uid: userProfleInfo.uid,
      })
      .from(userProfleInfo)
      .where(eq(userProfleInfo.userUid, user[0].uid));
    const tryEdu = await db
      .select()
      .from(userEducation)
      .where(eq(userEducation.profileInfoUid, profileInfo[0].uid));
    if (tryEdu.length === 0) {
      await db
        .insert(userEducation)
        .values({ ...data, profileInfoUid: profileInfo[0].uid })
        .execute();
      return true;
    }
    await db
      .update(userEducation)
      .set(data)
      .where(eq(userEducation.profileInfoUid, profileInfo[0].uid));
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const updatePassword = async (
  user: UserInferSelect,
  newPassword: string
) => {
  try {
    await db
      .update(users)
      .set({ password: newPassword })
      .where(eq(users.uid, user.uid));
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const deleteExperience = async (uid: string, itemUid: string) => {
  try {
    const user = await db
      .select({
        uid: users.uid,
      })
      .from(users)
      .where(eq(users.uid, uid));
    if (user.length === 0) {
      throw new CustomError(HttpStatus.BAD_REQUEST, 'Пользователь не найден');
    }
    const profileInfo = await db
      .select({
        uid: userProfleInfo.uid,
      })
      .from(userProfleInfo)
      .where(eq(userProfleInfo.userUid, user[0].uid));

    const tryExp = await db
      .select()
      .from(userExperience)
      .where(
        and(
          eq(userExperience.profileInfoUid, profileInfo[0].uid),
          eq(userExperience.uid, itemUid)
        )
      );
    if (tryExp.length === 0) {
      throw new CustomError(
        HttpStatus.BAD_REQUEST,
        'Элемент не найден или удален'
      );
    }
    await db.delete(userExperience).where(eq(userExperience.uid, itemUid));
    return true;
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const deleteSkill = async (uid: string, itemUid: string) => {
  try {
    const user = await db
      .select({
        uid: users.uid,
      })
      .from(users)
      .where(eq(users.uid, uid));
    if (user.length === 0) {
      throw new CustomError(HttpStatus.BAD_REQUEST, 'Пользователь не найден');
    }
    const profileInfo = await db
      .select({
        uid: userProfleInfo.uid,
      })
      .from(userProfleInfo)
      .where(eq(userProfleInfo.userUid, user[0].uid));

    const trySkill = await db
      .select()
      .from(userSkills)
      .where(
        and(
          eq(userSkills.profileInfoUid, profileInfo[0].uid),
          eq(userSkills.uid, itemUid)
        )
      );
    if (trySkill.length === 0) {
      throw new CustomError(
        HttpStatus.BAD_REQUEST,
        'Элемент не найден или удален'
      );
    }
    await db.delete(userSkills).where(eq(userSkills.uid, itemUid));
    return true;
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

// export const findCompany = async (query: string) => {
//   try {
//     const response = await axios.post(
//       'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party',
//       {
//         query,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//           Authorization: 'Token ' + config.app.dadata,
//         },
//       }
//     );

//     const result = response.data;
//     const companyData = {
//       companyName: result.suggestions.map((item) => ({
//         value: item.value,
//       })),
//     };

//     return companyData;
//   } catch (error) {
//     if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
//       throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//     throw error;
//   }
// };

export const findUserTag = async (searchQuery: string) => {
  try {
    let query = db
      .select({
        uid: users.uid,
        tag: users.tag,
        fullName: users.fullName,
        image: users.image,
      })
      .from(users)
      .$dynamic();

    if (searchQuery) {
      query = query.where(
        or(
          ilike(users.tag, `%${searchQuery}%`),
          ilike(users.fullName, `%${searchQuery}%`)
        )
      );
    }
    const res = await query;
    return res;
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const addFile = async (userUid: string, addDto: AddFileDto) => {
  try {
    const user = await db
      .select({
        uid: users.uid,
      })
      .from(users)
      .where(eq(users.uid, userUid));
    if (user.length === 0) {
      throw new CustomError(HttpStatus.BAD_REQUEST, 'Пользователь не найден');
    }
    const profileInfo = await db
      .select({
        uid: userProfleInfo.uid,
      })
      .from(userProfleInfo)
      .where(eq(userProfleInfo.userUid, user[0].uid));
    await db
      .insert(userFiles)
      .values({ ...addDto, profileInfoUid: profileInfo[0].uid });
    return true;
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const editFile = async (userUid: string, data: EditFileDto) => {
  try {
    const user = await db
      .select({
        uid: users.uid,
      })
      .from(users)
      .where(eq(users.uid, userUid));
    if (user.length === 0) {
      throw new CustomError(HttpStatus.BAD_REQUEST, 'Пользователь не найден');
    }
    const profileInfo = await db
      .select({
        uid: userProfleInfo.uid,
      })
      .from(userProfleInfo)
      .where(eq(userProfleInfo.userUid, user[0].uid));
    const file = await db
      .select()
      .from(userFiles)
      .where(
        and(
          eq(userFiles.profileInfoUid, profileInfo[0].uid),
          eq(userFiles.uid, data.fileUid)
        )
      );
    const newFile = {
      uid: file[0].file.uid,
      fileUrl: file[0].file.fileUrl,
      name: data.name,
    };
    await db
      .update(userFiles)
      .set({ file: newFile })
      .where(
        and(
          eq(userFiles.profileInfoUid, profileInfo[0].uid),
          eq(userFiles.uid, data.fileUid)
        )
      );
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};

export const deleteFile = async (userUid: string, uid: string) => {
  try {
    const user = await db
      .select({
        uid: users.uid,
      })
      .from(users)
      .where(eq(users.uid, userUid));
    if (user.length === 0) {
      throw new CustomError(HttpStatus.BAD_REQUEST, 'Пользователь не найден');
    }
    const profileInfo = await db
      .select({
        uid: userProfleInfo.uid,
      })
      .from(userProfleInfo)
      .where(eq(userProfleInfo.userUid, user[0].uid));
    await db
      .delete(userFiles)
      .where(
        and(
          eq(userFiles.uid, uid),
          eq(userFiles.profileInfoUid, profileInfo[0].uid)
        )
      );
    return true;
  } catch (error) {
    if (error.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
};
