import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "../modules/auth/auth.module";
import { UsersModule } from "../modules/auth/users/users.module";
import { RedisModule } from "./redis/redis.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "../shared/guards/auth.guard";
import { TransactionsModule } from "../modules/transactions/transactions.module";
import { GoalsModule } from "../modules/goals/goals.module";
import {
  makeCounterProvider,
  makeHistogramProvider,
  PrometheusModule,
} from "@willsoto/nestjs-prometheus";
import { MetricsMiddleware } from "../shared/middlewares/metrics.middleware";
import { MyCustomController } from "./prometheus/prometheus.controller";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    RedisModule,
    UsersModule,
    AuthModule,
    TransactionsModule,
    GoalsModule,
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
      controller: MyCustomController,
      global: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    makeCounterProvider({
      name: "http_requests_total",
      help: "Total number of HTTP requests",
      labelNames: ["method", "status"],
    }),
    makeHistogramProvider({
      name: "http_request_duration_seconds",
      help: "Duration of HTTP requests in seconds",
      labelNames: ["method", "status"],
    }),
  ],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MetricsMiddleware).forRoutes("/*api");
  }
}
