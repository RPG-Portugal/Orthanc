package org.rpgportugal.jobs

import com.coreoz.wisp.Scheduler
import com.coreoz.wisp.SchedulerConfig
import com.coreoz.wisp.schedule.cron.CronSchedule

data class Job(val jobInfo: JobInfo, val run: () -> Unit) {

    companion object {
        private val defaultConfig =
            SchedulerConfig.builder()
                .minThreads(2)
                .maxThreads(15)
                .build()

        fun createScheduler(config: SchedulerConfig = defaultConfig): Scheduler =
            Scheduler(config)

        fun <T> schedule(scheduler: Scheduler, jobInfo: JobInfo, args: T, job: (T) -> Unit) {
            schedule(scheduler, jobInfo.name, jobInfo.cron) {
                job(args)
            }
        }

        fun schedule(scheduler: Scheduler, jobInfo: JobInfo, job: () -> Unit) {
            schedule(scheduler, jobInfo.name, jobInfo.cron, job)
        }

        private fun schedule(scheduler: Scheduler, name: String, cron: String, job: () -> Unit) {
            scheduler.schedule(name, { job() },CronSchedule.parseQuartzCron(cron))
        }

        fun scheduleManny(scheduler: Scheduler = createScheduler(), vararg jobs: Job) {
            scheduleManny(scheduler, jobs.asSequence())
        }

        fun scheduleManny(scheduler: Scheduler = createScheduler(), jobs: Sequence<Job>) {
            for (job in jobs) {
                schedule(scheduler, job.jobInfo, job.run)
            }
        }
    }
}