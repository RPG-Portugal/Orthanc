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

        private val scheduler = createScheduler()

        private fun createScheduler(config: SchedulerConfig = defaultConfig): Scheduler =
            Scheduler(config)

        fun <T> schedule(jobInfo: JobInfo, args: T, job: (T) -> Unit) {
            val runnable = Runnable { job(args) }
            val cron = CronSchedule.parseQuartzCron(jobInfo.cron)
            scheduler.schedule(jobInfo.name, runnable, cron)
        }
    }
}