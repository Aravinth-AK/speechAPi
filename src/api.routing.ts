import * as express from 'express';
import { VoicePatternController } from './controller/voice-pattern.controller';
export class ApiRouting {
        public static ConfigureRouters(app: express.Router) {
                app.use(VoicePatternController.route, new VoicePatternController().router);
        }
}
