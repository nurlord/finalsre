import { Injectable, NestMiddleware } from "@nestjs/common";
import { InjectMetric } from "@willsoto/nestjs-prometheus";
import { Counter, Histogram } from "prom-client";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(
    @InjectMetric("http_requests_total") private counter: Counter<string>,
    @InjectMetric("http_request_duration_seconds")
    private histogram: Histogram<string>,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const end = this.histogram.startTimer();
    res.on("finish", () => {
      // Increment with 'method' and 'status' labels
      this.counter.inc({ method: req.method, status: res.statusCode });
      end({ method: req.method, status: res.statusCode });
    });
    next();
  }
}
