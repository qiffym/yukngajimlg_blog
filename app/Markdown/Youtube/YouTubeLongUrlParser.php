<?php

namespace App\Markdown\Youtube;

final class YouTubeLongUrlParser implements YouTubeUrlParserInterface
{
    private const string HOST = 'www.youtube.com';
    private const string PATH = '/watch';
    private const array TIMESTAMP_GET = [
        't', 'time_continue', 'start'
    ];
    private const string ID_GET = 'v';

    public function parse(string $url): ?YouTubeUrlInterface
    {
        if (parse_url($url, PHP_URL_HOST) !== self::HOST || parse_url($url, PHP_URL_PATH) !== self::PATH) {
            return null;
        }

        parse_str((string)parse_url($url, PHP_URL_QUERY), $getParams);

        if (!array_key_exists(self::ID_GET, $getParams) || empty($getParams[self::ID_GET])) {
            return null;
        }

        foreach (self::TIMESTAMP_GET as $timeGet) {
            if (array_key_exists($timeGet, $getParams) && !empty($getParams[$timeGet])) {
                return new YouTubeUrl($getParams[self::ID_GET], $getParams[$timeGet]);
            }
        }

        return new YouTubeUrl($getParams[self::ID_GET]);
    }
}
