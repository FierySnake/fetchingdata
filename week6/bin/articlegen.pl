#!/usr/bin/perl -w
use strict;
use warnings;

use File::Path qw(make_path);
use Text::Lorem;    # sudo apt install libtext-lorem-perl

use constant NUM_FILES => 25;
use constant MAX_TITLE_WORDS => 5;
use constant MIN_PARAGRAPHS => 3;
use constant MAX_ADDITIONAL_PARAGRAPHS => 5;

make_path('articles');
my $filename_fmt = 'articles/article%0' . length(NUM_FILES) . 'd.md';
my $text = Text::Lorem->new();

for my $n (1..NUM_FILES) {

    my $title = ucfirst $text->words(int(rand(MAX_TITLE_WORDS)) + 1);
    my $content = $text->paragraphs(MIN_PARAGRAPHS + int(rand(MAX_ADDITIONAL_PARAGRAPHS)));

    my $article = <<"END_ARTICLE";
---
title: $title
layout: article
---
$content
END_ARTICLE

    my $filename = sprintf $filename_fmt, $n;
    print "$filename\n";

    open(my $fh, '>', $filename) or die "Couldn't open $filename: $!\n";
    print $fh $article;
    close($fh) or die "Couldn't close $filename: $!\n";
}