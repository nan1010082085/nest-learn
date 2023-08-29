import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { WinstonModule } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import { Console, DailyRotateFile } from 'winston/lib/winston/transports';
import { utilities } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { ConfigLogEnum } from 'src/enum/db.enum';

interface CreateDailyRotateFileOptions {
  dirname?: string;
  formatSimple?: boolean;
}

function createDailyRotateFile(
  level: string,
  fileName: string,
  options: CreateDailyRotateFileOptions,
) {
  const { dirname = 'logs', formatSimple = true } = options;
  const combine = () =>
    formatSimple
      ? [
          winston.format.timestamp(),
          winston.format.ms(),
          winston.format.simple(),
        ]
      : [winston.format.timestamp(), winston.format.ms()];

  return new DailyRotateFile({
    // 文件名称
    dirname,
    // 等级
    level,
    // 日志文件名称
    filename: `${fileName}-%DATE%.log`,
    // 格式化
    datePattern: 'YYYY-MM-DD-HH',
    // 文件压缩
    zippedArchive: true,
    // 文件最大大小 20m(兆)
    maxSize: '10m',
    // 最大文件天数 14d(天)
    maxFiles: '14d',
    format: winston.format.combine(...combine()),
  });
}

@Module({
  imports: [
    TypeOrmModule.forFeature([Log, User]),
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = (key: string) => configService.get(`log.${key}`);

        const dir = config(ConfigLogEnum.PATH);

        const consoleTransport = new Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            utilities.format.nestLike(),
          ),
        });

        return {
          transports: [
            consoleTransport,
            ...(config(ConfigLogEnum.ON)
              ? [
                  createDailyRotateFile('info', 'info', {
                    dirname: dir,
                  }),
                  createDailyRotateFile('warn', 'error', {
                    dirname: dir,
                    formatSimple: false,
                  }),
                ]
              : []),
          ],
        };
      },
    }),
  ],
  controllers: [LogsController],
  providers: [LogsService, UserService],
})
export class LogsModule {}
