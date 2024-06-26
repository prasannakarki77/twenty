import { Module } from '@nestjs/common';

import { ObjectMetadataRepositoryModule } from 'src/engine/object-metadata-repository/object-metadata-repository.module';
import { CreateAuditLogFromInternalEvent } from 'src/modules/timeline/jobs/create-audit-log-from-internal-event';
import { UpsertTimelineActivityFromInternalEvent } from 'src/modules/timeline/jobs/upsert-timeline-activity-from-internal-event.job';
import { AuditLogObjectMetadata } from 'src/modules/timeline/standard-objects/audit-log.object-metadata';
import { TimelineActivityModule } from 'src/modules/timeline/timeline-activity.module';
import { WorkspaceMemberObjectMetadata } from 'src/modules/workspace-member/standard-objects/workspace-member.object-metadata';

@Module({
  imports: [
    ObjectMetadataRepositoryModule.forFeature([
      WorkspaceMemberObjectMetadata,
      AuditLogObjectMetadata,
    ]),
    TimelineActivityModule,
  ],
  providers: [
    {
      provide: CreateAuditLogFromInternalEvent.name,
      useClass: CreateAuditLogFromInternalEvent,
    },
    {
      provide: UpsertTimelineActivityFromInternalEvent.name,
      useClass: UpsertTimelineActivityFromInternalEvent,
    },
  ],
})
export class TimelineJobModule {}
