import { Controller, Get, Injectable, Module, Scope } from "@nestjs/common";
import { randomUUID } from "crypto";

const shortId = () => randomUUID().slice(0, 8);

// 1) DEFAULT (singleton): created once, shared by everyone
@Injectable()
export class SingletonService {
  readonly id = shortId();
  private count = 0;

  constructor() {
    console.log(`[DEFAULT]    created -> ${this.id}`);
  }

  hit() {
    return ++this.count;
  }
}

// 2) TRANSIENT: every class that injects it gets its own copy
@Injectable({ scope: Scope.TRANSIENT })
export class TransientService {
  readonly id = shortId();

  constructor() {
    console.log(`[TRANSIENT]  created -> ${this.id}`);
  }
}

// 3) REQUEST: a new instance for every incoming request
@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  readonly id = shortId();
  private count = 0;

  // Also injects the transient service, so we can show that
  // RequestService and the controller get DIFFERENT transient copies.
  constructor(private readonly transient: TransientService) {
    console.log(`[REQUEST]    created -> ${this.id}`);
  }

  hit() {
    return ++this.count;
  }

  get transientId() {
    return this.transient.id;
  }
}

// Because it injects a REQUEST-scoped provider, this controller
// automatically becomes request-scoped too (scope "bubbles up").
@Controller("scopes")
export class ScopesController {
  constructor(
    private readonly singleton: SingletonService,
    private readonly request: RequestService,
    private readonly transient: TransientService,
  ) {
    console.log("[CONTROLLER] created (new one per request)");
  }

  @Get()
  demo() {
    return {
      default: {
        instanceId: this.singleton.id, // same on every request
        hits: this.singleton.hit(), // 1, 2, 3, 4...
      },
      request: {
        instanceId: this.request.id, // changes on every request
        hits: this.request.hit(), // always 1
      },
      transient: {
        controllerCopyId: this.transient.id, // own copy
        requestServiceCopyId: this.request.transientId, // different copy
      },
    };
  }
}

@Module({
  controllers: [ScopesController],
  providers: [SingletonService, RequestService, TransientService],
})
export class ScopesDemoModule {}
