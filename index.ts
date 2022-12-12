import { strict as assert } from "assert";
import {
  LocalDate,
  Month,
  DayOfWeek,
  LocalDateTime,
  ZoneOffset,
  ZonedDateTime,
  ZoneId,
  Period,
  Duration,
} from "@js-joda/core";
import "@js-joda/timezone"; // import required for ZoneId.of() call

// LocalDate
const localDate = LocalDate.parse("2022-12-12"); // could come from an API
assert.equal(localDate.month(), Month.DECEMBER);
assert.equal(localDate.dayOfWeek(), DayOfWeek.MONDAY);

// LocalDateTime
const localDateTime = LocalDateTime.now();
const localDateTimeInUTCZone = LocalDateTime.now(ZoneOffset.UTC);
assert.equal(localDateTimeInUTCZone.hour() - 7, localDateTime.hour());

// ZonedDateTime
const zonedDateTimeUTC = ZonedDateTime.parse("2022-12-12T22:25:00Z"); // could come from an API response
const zonedDateTimeMST = ZonedDateTime.of(
  LocalDateTime.parse("2022-12-12T15:25:00"), // MST is -7 hour offset
  ZoneId.of("America/Denver")
);
assert.equal(
  zonedDateTimeUTC.toEpochSecond(),
  zonedDateTimeMST.toEpochSecond()
);

// Period (date-based amount)
const futureZonedDateTime = zonedDateTimeUTC.plus(Period.of(10, 10, 10)); // add 10 years, 10 months, 10 days in the future
assert.equal(futureZonedDateTime.toString(), "2033-10-22T22:25Z");

// Duration (time-based amount)
assert.equal(
  LocalDateTime.parse("2022-12-12T16:25:00")
    .plus(Duration.ofSeconds(5))
    .toString(), // add 5 seconds
  "2022-12-12T16:25:05"
);

console.log("Tests passed :)");
